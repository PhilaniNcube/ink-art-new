/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { connection } from 'next/server'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React, { Suspense } from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const PayloadLayoutContent = async ({ children }: Args) => {
  await connection()

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

const Layout = ({ children }: Args) => (
  <Suspense fallback={null}>
    <PayloadLayoutContent>{children}</PayloadLayoutContent>
  </Suspense>
)

export default Layout