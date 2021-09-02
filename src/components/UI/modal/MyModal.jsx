import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) =>{
    const rootClass = [classes.MyModal];

    if (visible) {rootClass.push(classes.active)}

    return (
        <div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.MyModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    )
}

export default MyModal;