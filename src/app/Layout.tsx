import React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '../lib/react-query'

const RootLayout = ({children} : {children: React.ReactNode}) => {
     return (
        <html lang='es'>
            <body>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </body>
        </html>
    )
}

export default RootLayout