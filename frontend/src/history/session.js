var UserProfile = (function () {
    var full_name = "";
    var department = '';

    var getName = function () {
        return full_name;    // Or pull this from cookie/localStorage
    };

    var setName = function (name) {
        full_name = name;
        // Also set this in cookie/localStorage
    };

    var setDepartment = function (departmento) {
        department = departmento;
    };

    var getDepartment = function () {
        return department;
    };

    return {
        getName: getName,
        setName: setName,
        setDepartment: setDepartment,
        getDepartment: getDepartment
    };

})();

export default UserProfile;