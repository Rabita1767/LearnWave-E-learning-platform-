import React from "react";

interface IAnchor {
    href: string,
    children: React.ReactNode,
}
const AnchorTag: React.FC<IAnchor> = ({ href, children }) => {
    return (
        <>
            <a href={href}>{children}</a>
        </>

    )

}
export default AnchorTag;