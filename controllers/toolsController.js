// controllers/toolsController.js
const ToolsRequest = require('../models/ToolsRequest');
const Tool = require('../models/Tool');

exports.getToolsForm = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    try {
        const tools = await Tool.find({});
        res.render('toolsForm', { tools });
    } catch (err) {
        console.error(err);
        res.render('toolsForm', { error: 'Unable to load tools list', tools: [] });
    }
};

exports.postToolsForm = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    const { requestFor } = req.body;
    
    try {
        if (requestFor === 'myself') {
            const { selectedTool, justification, approval } = req.body;
            const toolsRequest = new ToolsRequest({
                requestFor,
                selectedTool,
                justification,
                approval,
                createdBy: req.session.userId
            });
            await toolsRequest.save();
        } else if (requestFor === 'someone else') {
            const { requestorName, employeeID, employeeEmail, tool } = req.body;
            const toolsRequest = new ToolsRequest({
                requestFor,
                requestorName,
                employeeID,
                employeeEmail,
                tool,
                createdBy: req.session.userId
            });
            await toolsRequest.save();
        }
        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.render('toolsForm', { error: 'Error submitting tools request', tools: [] });
    }
};