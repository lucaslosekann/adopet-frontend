import React from "react";

export default function Header() {
    return (
        <div className="flex bg-background-secondary h-16">
            <div className="container mx-auto flex items-center">
                <img src="/logo.svg" alt="logo" className="w-32" />
            </div>
        </div>
    );
}
