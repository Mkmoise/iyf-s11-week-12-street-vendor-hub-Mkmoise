import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  userAPI,
} from "../services/api";

export default function Profile() {
  const { user } =
    useAuth();

  const [profile, setProfile] =
    useState(user);

  const [bio, setBio] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [editing, setEditing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    userAPI
      .getProfile(user.id)
      .then((data) => {
        const current =
          data.user || data;

        setProfile(current);
        setBio(
          current.bio || ""
        );
        setLocation(
          current.location || ""
        );
      })
      .catch((error) => {
        setError(
          error.message ||
            "Unable to load profile."
        );
      });
  }, [user]);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const data =
        await userAPI.updateProfile({
          bio: bio.trim(),
          location:
            location.trim(),
        });

      setProfile(
        data.user || data
      );

      setEditing(false);

      setMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="profile-page">
      <div className="profile-container">
        <section className="profile-card">
          <div className="profile-avatar">
            {profile?.name
              ?.charAt(0)
              .toUpperCase() ||
              "U"}
          </div>

          <p className="eyebrow">
            MY PROFILE
          </p>

          <h1>
            {profile?.name ||
              "User"}
          </h1>

          <p className="profile-email">
            {profile?.email}
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {!editing ? (
            <>
              <div className="profile-info">
                <h3>
                  About
                </h3>

                <p>
                  {profile?.bio ||
                    "No bio added yet."}
                </p>
              </div>

              <div className="profile-info">
                <h3>
                  Location
                </h3>

                <p>
                  {profile?.location ||
                    "No location added yet."}
                </p>
              </div>

              <button
                className="button"
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form
              className="form"
              onSubmit={handleSubmit}
            >
              <label>
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(event) =>
                  setBio(
                    event.target.value
                  )
                }
                rows="5"
              />

              <label>
                Location
              </label>

              <input
                value={location}
                onChange={(event) =>
                  setLocation(
                    event.target.value
                  )
                }
              />

              <div className="button-row">
                <button
                  className="button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save"}
                </button>

                <button
                  type="button"
                  className="button secondary-button"
                  onClick={() =>
                    setEditing(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
