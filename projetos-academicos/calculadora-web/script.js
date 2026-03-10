body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7f9;
    font-family: "Segoe UI", Arial, sans-serif;
}

h1{
    color: #444;
    font-weight: 500;
}

.calculator {
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    padding: 22px;
    width: 300px;
}

#display {
    width: 100%;
    height: 55px;
    font-size: 24px;
    text-align: right;
    border: none;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 12px;
    background-color: #f1f3f5;
    box-sizing: border-box;
    color: #333;
}

.box-buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;
}

button {
    height: 60px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #e9ecef;
    color: #333;
    transition: all 0.2s ease;
}

button:hover {
    background-color: #dfe3e7;
}

button:active {
    transform: scale(0.96);
}

.btn-zero{
    grid-column: 1 / 3;
}

.btn-result{
    grid-row: 4 / 6;
    grid-column: 4;
    height: 100%;
    background-color: #7aa7ff;
    color: white;
}

.btn-result:hover{
    background-color: #5f95ff;
}
