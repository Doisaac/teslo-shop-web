import { Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { cn } from '@/lib/utils'
import { CustomLogo } from '@/components/custom/CustomLogo'
import { useAuthStore } from '@/auth/store/auth.store'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

export const CustomHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { gender } = useParams()
  const { authStatus, isAdmin, logout } = useAuthStore()

  const inputRef = useRef<HTMLInputElement>(null)
  const searchQuery = searchParams.get('query') || ''

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false)

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    const query = inputRef.current?.value

    const newSearchParams = new URLSearchParams()

    if (!query) {
      newSearchParams.delete('query')
    } else {
      newSearchParams.set('query', inputRef.current!.value)
    }

    setSearchParams(newSearchParams)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 w-full items-center justify-between">
          {/* Logo */}
          <div className="flex-1">
            <CustomLogo />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex-2 lg:flex items-center space-x-8 justify-center">
            <Link
              to="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                !gender ? 'underline underline-offset-4' : '',
              )}
            >
              Todos
            </Link>
            <Link
              to="/gender/men"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender === 'men' ? 'underline underline-offset-4' : '',
              )}
            >
              Hombres
            </Link>
            <Link
              to="/gender/women"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender === 'women' ? 'underline underline-offset-4' : '',
              )}
            >
              Mujeres
            </Link>
            <Link
              to="/gender/kid"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender === 'kids' ? 'underline underline-offset-4' : '',
              )}
            >
              Niños
            </Link>
          </nav>

          {/* Search */}
          <div className="flex relative items-center space-x-4 justify-end flex-1">
            <div
              className={cn(
                'hidden md:flex items-center space-x-2',
                isMobileSearchOpen &&
                  'flex fixed inset-x-0 m-0 top-16 z-50 bg-slate-50 p-4 md:hidden',
              )}
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder="Buscar productos..."
                  className="pl-9 w-full md:w-64 h-9 bg-white"
                  onKeyDown={handleSearch}
                  defaultValue={searchQuery}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setIsMobileSearchOpen((prevState) => !prevState)
                setTimeout(() => inputRef.current?.focus(), 0)
              }}
            >
              <Search className="h-5 w-5" />
            </Button>

            {authStatus === 'not-authenticated' ? (
              <Link to="/auth/login" className="hidden lg:block">
                <Button variant="default" size="sm" className="ml-2">
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="ml-2 hidden lg:block"
              >
                Cerrar sesión
              </Button>
            )}

            {isAdmin() && (
              <Link to="/admin" className="hidden lg:block">
                <Button variant="destructive" size="sm" className="ml-2">
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Navigation - Mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-64 p-4 lg:hidden">
                <nav className="flex flex-col space-y-4 mt-8">
                  <SheetClose asChild>
                    <Link to="/" className="text-sm font-medium">
                      Todos
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/gender/men" className="text-sm font-medium">
                      Hombres
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/gender/women" className="text-sm font-medium">
                      Mujeres
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/gender/kid" className="text-sm font-medium">
                      Niños
                    </Link>
                  </SheetClose>

                  <hr />

                  {authStatus === 'not-authenticated' ? (
                    <SheetClose asChild>
                      <Link to="/auth/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Button variant="outline" onClick={logout}>
                        Cerrar sesión
                      </Button>
                    </SheetClose>
                  )}

                  {isAdmin() && (
                    <SheetClose asChild>
                      <Link to="/admin">
                        <Button variant="destructive" className="w-full">
                          Admin
                        </Button>
                      </Link>
                    </SheetClose>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
