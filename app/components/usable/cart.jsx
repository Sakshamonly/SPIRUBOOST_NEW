"use client"

<<<<<<< HEAD
import { useEffect, useState } from "react"
=======
import { useState } from "react"
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
import { useRouter } from "next/navigation"
import { X, Plus, Minus } from "lucide-react"

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter()
<<<<<<< HEAD
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (typeof window === "undefined") return

    const syncCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]")
      const normalizedCart = savedCart.map((item) => {
        const stockLimit = Number(item.countInStock || item.stock || 0)
        const quantity = Number(item.quantity || 1)

        return {
          ...item,
          quantity: stockLimit > 0 ? Math.min(quantity, stockLimit) : quantity,
        }
      })

      setCartItems(normalizedCart)
      localStorage.setItem("cartItems", JSON.stringify(normalizedCart))
    }

    syncCart()
    window.addEventListener("storage", syncCart)

    if (isOpen) {
      syncCart()
    }

    return () => {
      window.removeEventListener("storage", syncCart)
    }
  }, [isOpen])

  const updateCartStorage = (updatedItems) => {
    setCartItems(updatedItems)
    localStorage.setItem("cartItems", JSON.stringify(updatedItems))
  }

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) => {
      const targetItem = prevItems.find((item) => String(item.id) === String(id))
      if (!targetItem) return prevItems

      const stockLimit = Number(targetItem.countInStock || targetItem.stock || 0)
      const nextQuantity = targetItem.quantity + delta
      const cappedQuantity = stockLimit > 0 ? Math.min(nextQuantity, stockLimit) : nextQuantity
      let updatedItems = []

      if (prevItems.length === 1) {
        updatedItems = prevItems.map((item) =>
          String(item.id) === String(id)
            ? { ...item, quantity: Math.max(1, cappedQuantity) }
            : item
        )
      } else {
        if (cappedQuantity <= 0) {
          updatedItems = prevItems.filter((item) => String(item.id) !== String(id))
        } else {
          updatedItems = prevItems.map((item) =>
            String(item.id) === String(id)
              ? { ...item, quantity: cappedQuantity }
              : item
          )
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedItems))
=======
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Spirulina Powder", price: 1999, quantity: 2, image: "/placeholder.svg?height=64&width=64" },
    { id: 2, name: "Spirulina Tablets", price: 1499, quantity: 1, image: "/placeholder.svg?height=64&width=64" },
  ])

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0) // Remove if quantity is 0 or less
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
      return updatedItems
    })
  }

  const calculateTotal = () => {
<<<<<<< HEAD
    return cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
=======
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}>
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "opacity-0"}`}
        onClick={onClose}
      ></div>
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
<<<<<<< HEAD
        <div
          className="p-6 h-full flex flex-col"
          style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto" }}
        >
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-xl font-semibold text-black">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
=======
        <div className="p-6 h-full flex flex-col" style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto" }}>
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-xl font-semibold text-black">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              <X className="h-6 w-6 stroke-1 text-black" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
<<<<<<< HEAD
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-2 border-b border-gray-200 last:border-b-0"
                >
=======
                <div key={item.id} className="flex items-center space-x-4 p-2 border-b border-gray-200 last:border-b-0">
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-black">{item.name}</h3>
<<<<<<< HEAD
                    <p className="text-sm text-black/70">INR {Number(item.price).toFixed(2)}</p>
=======
                    <p className="text-sm text-black/70">INR {(item.price / 100).toFixed(2)}</p>
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="h-4 w-4 stroke-1 text-black" />
                      </button>
                      <span className="mx-2 text-black font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
<<<<<<< HEAD
                        disabled={
                          Number(item.countInStock || item.stock || 0) > 0 &&
                          Number(item.quantity || 0) >= Number(item.countInStock || item.stock || 0)
                        }
=======
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
                        className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="h-4 w-4 stroke-1 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 shrink-0">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span className="text-black">Total:</span>
<<<<<<< HEAD
              <span className="text-black">INR {calculateTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                onClose()
                localStorage.removeItem("buyNowItem")
                localStorage.removeItem("checkoutItem")
                router.push("/checkout")
=======
              <span className="text-black">INR {(calculateTotal() / 100).toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                onClose()
                router.push('/checkout')
>>>>>>> 39578b119d7e217399a8cb93e4e979e19660c174
              }}
              className="w-full bg-green-100 text-green-800 py-3 rounded-lg hover:bg-green-200 transition-colors duration-200 border border-green-200 font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
