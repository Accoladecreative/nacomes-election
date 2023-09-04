import React from 'react'
import { Helmet } from 'react-helmet'
export const PageTitle = ({ tile }) => {
    return (
        //   <div>
        <Helmet>
            <title>FUOYE CPE Election Portal | {tile}</title>
        </Helmet>
    )
}

export default PageTitle