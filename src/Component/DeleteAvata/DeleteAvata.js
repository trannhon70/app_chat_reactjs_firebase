import React from 'react';

function DeleteAvata({deleteImage}) {
    return (
        <label onClick={deleteImage} htmlFor="delete" style={{ cursor: "pointer", color:'red' }}>
                <i className="fa fa-times"></i>
              </label>
    );
}

export default DeleteAvata;