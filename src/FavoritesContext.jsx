import { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("market-favorites") || "[]")
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("market-favorites", JSON.stringify(favoriteIds))
  }, [favoriteIds])

  function toggleFavorite(id) {
    setFavoriteIds((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id])
  }

  function isFavorite(id) {
    return favoriteIds.includes(id)
  }

  return (
    <FavoritesContext.Provider value={{
      favoriteIds,
      favoriteCount: favoriteIds.length,
      toggleFavorite,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider")
  return context
}
