function setToken(newToken) {
    localStorage.setItem('token', newToken);
}

function getToken() {
    return localStorage.getItem('token');
}

function getAuthHeaders() {
    const token = getToken(); 
    return {
        'Authorization': `Bearer ${token}`
    };
}
function setProductId(productId) {
    localStorage.setItem('productId', productId);
}

function getProductId() {
    return localStorage.getItem('productId');
}

function setCategoryName(categoryName){
    localStorage.setItem('categoryName', categoryName);
}

function getCategoryName(){
    return localStorage.getItem('categoryName');
}