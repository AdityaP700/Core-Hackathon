// components/game/OrderBook.tsx
export function OrderBook() {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2">Order Book</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Buy Orders</h4>
            {/* Buy orders list */}
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Sell Orders</h4>
            {/* Sell orders list */}
          </div>
        </div>
      </div>
    );
  }
  