import React, {useEffect, useState} from 'react';
import '../../App.css';
import {HomeHeader} from "../../Components/HomeHeader";

export function APanel() {

    return (
        <div className="bg-neutral-700 min-h-screen grid grid-cols-1 content-start gap-1 justify-items-center">
            <HomeHeader/>
        </div>
    );
}