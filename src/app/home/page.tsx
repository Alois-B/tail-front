'use client';

import React from 'react';
import ResponsiveAppBar from "../materials/ResponsiveAppBar";
import { BrowserRouter as Router } from 'react-router-dom';

export default function Home(){
    return (
        <Router><ResponsiveAppBar></ResponsiveAppBar>
        <div>

        </div>
        </Router>
    );
}