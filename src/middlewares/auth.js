const adminAuth = (req, res, next) => {
    const token = 'xyz'; // dummy
    const isAdminAuthorized = token === 'xyz';
    if (isAdminAuthorized) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

const userAuth = (req, res, next) => {
    const token = 'xyz';
    const isUserAuthorized = token === 'xyz';
    if (isUserAuthorized) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = { adminAuth, userAuth };