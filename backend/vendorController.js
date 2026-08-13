// Pointing directly to vendor.js inside backend folder
const Vendor = require('./vendor');

// @desc    Get all vendors (with search & category filtering)
// @route   GET /api/vendors
// @access  Public
const getVendors = async (req, res) => {
  try {
    const { category, search } = req.query;
    let queryFilter = {};

    // Filter by category
    if (
      category &&
      category.trim() !== '' &&
      category.toLowerCase() !== 'all' &&
      category.toLowerCase() !== 'all categories'
    ) {
      queryFilter.category = category.trim();
    }

    // Filter by search text (case-insensitive name match)
    if (search && search.trim() !== '') {
      queryFilter.name = { $regex: search.trim(), $options: 'i' };
    }

    const vendors = await Vendor.find(queryFilter);
    return res.status(200).json(vendors);
  } catch (error) {
    console.error('Error in getVendors:', error);
    return res.status(500).json({
      message: 'Failed to fetch vendors',
      error: error.message,
    });
  }
};

// @desc    Get single vendor by ID
// @route   GET /api/vendors/:id
// @access  Public
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.status(200).json(vendor);
  } catch (error) {
    console.error('Error in getVendorById:', error);
    return res.status(500).json({
      message: 'Failed to fetch vendor',
      error: error.message,
    });
  }
};

// @desc    Create a new vendor
// @route   POST /api/vendors
// @access  Public
const createVendor = async (req, res) => {
  try {
    const { name, category, description, phone, email, location } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Vendor name is required' });
    }

    const newVendor = new Vendor({
      name,
      category,
      description,
      phone,
      email,
      location,
    });

    const savedVendor = await newVendor.save();
    return res.status(201).json(savedVendor);
  } catch (error) {
    console.error('Error in createVendor:', error);
    return res.status(500).json({
      message: 'Failed to create vendor',
      error: error.message,
    });
  }
};

// @desc    Update existing vendor
// @route   PUT /api/vendors/:id
// @access  Public
const updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.status(200).json(updatedVendor);
  } catch (error) {
    console.error('Error in updateVendor:', error);
    return res.status(500).json({
      message: 'Failed to update vendor',
      error: error.message,
    });
  }
};

// @desc    Delete a vendor
// @route   DELETE /api/vendors/:id
// @access  Public
const deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error in deleteVendor:', error);
    return res.status(500).json({
      message: 'Failed to delete vendor',
      error: error.message,
    });
  }
};

// EXPORTS MUST MATCH THE NAMES IMPORTED IN vendor.Routes.js
module.exports = {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};