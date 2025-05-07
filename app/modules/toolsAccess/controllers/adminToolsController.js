const Tool = require('../../models/Tool');

// GET Manage Tools Page
exports.getManageToolsPage = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  try {
    const tools = await Tool.find({});
    res.render('toolsAccess/manageTools', { tools });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading tools.');
  }
};

// POST Add New Tool
exports.postAddTool = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  const { toolName } = req.body;

  try {
    const newTool = new Tool({ name: toolName });
    await newTool.save();
    res.redirect('/admin/tools');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding tool.');
  }
};

// POST Delete Tool
exports.postDeleteTool = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.redirect('/admin/tools');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting tool.');
  }
};