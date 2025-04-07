import React from "react";

export default function HistoryCard({items}) {
  return (
    <div>
        {Array.isArray(items) && items.length > 0 ? (
            items.map((item, index) => (
                <div key={index} >
                    <div className="historyCard border p-3 mt-2">
                    <div className="text-sm font-semibold">
                        {item.file.fileName}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                        {item.dateTime}
                    </div>
                    <div className="text-xs font-semibold">
                        Converted to {item.type}
                    </div>
                </div>
                </div>
            ))) : (
                    <div className="text-gray-500 p-4">No history yet.</div>
                  )}
    </div>
  );
};

