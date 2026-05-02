type LayoutProps = {
  children: React.ReactNode
  flex?: boolean
  content?: boolean
}

const Layout = ({ children, flex = false, content = false }: LayoutProps) => {
    const headerOrFooter = flex && "flex justify-between flex-wrap items-center py-2 h-auto lg:h-20"
    const contentMain = content && "py-32"

    return (
        <div className={`container-default ${headerOrFooter} ${contentMain}`}>
            {children}
        </div>
    )
}

export default Layout;