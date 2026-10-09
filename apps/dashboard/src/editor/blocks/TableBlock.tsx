import React from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

interface TableBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const TableBlock: React.FC<TableBlockProps> = ({ block, isSelected }) => {
  const { updateBlock } = useEditorStore()

  const defaultRows = [
    ['Metric', 'Target', 'Status'],
    ['Active Campuses', '150+', 'Achieved'],
    ['Daily Student DAU', '85,000', 'Tracking On-Goal'],
    ['P2P Latency (ms)', '< 45ms', 'Optimized'],
  ]

  const tableData: string[][] = block.metadata?.rows || defaultRows

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const updated = tableData.map((row, rIdx) =>
      rIdx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell)) : row
    )
    updateBlock(block.id, {
      metadata: { ...block.metadata, rows: updated },
    })
  }

  const handleAddRow = () => {
    const colCount = tableData[0]?.length || 3
    const newRow = Array(colCount).fill('Cell')
    updateBlock(block.id, {
      metadata: { ...block.metadata, rows: [...tableData, newRow] },
    })
  }

  const handleAddCol = () => {
    const updated = tableData.map((row, idx) => [...row, idx === 0 ? 'Header' : 'Cell'])
    updateBlock(block.id, {
      metadata: { ...block.metadata, rows: updated },
    })
  }

  const handleDeleteRow = (rowIndex: number) => {
    if (tableData.length <= 1) return
    const updated = tableData.filter((_, idx) => idx !== rowIndex)
    updateBlock(block.id, {
      metadata: { ...block.metadata, rows: updated },
    })
  }

  return (
    <div className={`lumina-table-block ${isSelected ? 'is-selected' : ''}`}>
      <div className="lumina-table-responsive">
        <table className="lumina-table">
          <thead>
            <tr>
              {tableData[0]?.map((header, cIdx) => (
                <th key={cIdx} className="lumina-th">
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleCellChange(0, cIdx, e.target.value)}
                    className="lumina-table-input is-header"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rIdx) => (
              <tr key={rIdx + 1} className="lumina-tr">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="lumina-td">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rIdx + 1, cIdx, e.target.value)}
                      className="lumina-table-input"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isSelected && (
        <div className="lumina-table-actions">
          <button type="button" className="lumina-btn-table-action" onClick={handleAddRow}>
            <EditorIcons.Plus size={12} />
            <span>Add Row</span>
          </button>
          <button type="button" className="lumina-btn-table-action" onClick={handleAddCol}>
            <EditorIcons.Plus size={12} />
            <span>Add Column</span>
          </button>
          <button
            type="button"
            className="lumina-btn-table-action is-danger"
            onClick={() => handleDeleteRow(tableData.length - 1)}
          >
            <EditorIcons.Minus size={12} />
            <span>Remove Last Row</span>
          </button>
        </div>
      )}
    </div>
  )
}
