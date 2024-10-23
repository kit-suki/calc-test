import React, { useState } from 'react';
import { History } from 'lucide-react';

type HistoryItem = {
  calculation: string;
  result: string;
};

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
    setEquation(prev => prev + num);
  };

  const handleOperator = (op: string) => {
    setDisplay('0');
    setEquation(prev => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(equation).toString();
      setDisplay(result);
      setHistory(prev => [{
        calculation: equation,
        result: result
      }, ...prev].slice(0, 5));
      setEquation(result);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-xl w-[320px] p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold text-gray-800">電卓</div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <History className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="text-gray-500 text-sm h-6 overflow-hidden">
            {equation}
          </div>
          <div className="text-3xl font-bold text-right text-gray-800 overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button
            className="col-span-2 bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-colors font-semibold"
            onClick={handleClear}
          >
            クリア
          </button>
          <button
            className="bg-gray-200 p-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
            onClick={() => setDisplay(prev => prev.slice(0, -1) || '0')}
          >
            ←
          </button>
          <button
            className="bg-gray-200 p-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
            onClick={() => handleOperator('/')}
          >
            ÷
          </button>
          {buttons.map((btn, index) => (
            <button
              key={btn}
              className={`${
                ['÷', '×', '-', '+'].includes(btn)
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : btn === '='
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              } p-3 rounded-xl transition-colors font-semibold`}
              onClick={() => {
                if (btn === '=') handleCalculate();
                else if (['÷', '×', '-', '+'].includes(btn)) {
                  const op = btn === '×' ? '*' : btn === '÷' ? '/' : btn;
                  handleOperator(op);
                }
                else handleNumber(btn);
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {showHistory && (
        <div className="absolute top-0 -right-64 bg-white rounded-2xl shadow-xl w-60 p-4">
          <h3 className="text-lg font-semibold mb-3">履歴</h3>
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">履歴はありません</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">{item.calculation}</div>
                <div className="text-lg font-semibold">{item.result}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;