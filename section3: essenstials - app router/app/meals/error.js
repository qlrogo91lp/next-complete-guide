// error를 사용하기 위해서는 선언을 해야함
'use client';

// prop으로 error를 받게 되면 컴포넌트에서 error 객체를 정보들을 사용할 수 있음
export default function Error({ error }) {
    return <main className="error">
        <h1>An error occured!</h1>
        <p>Failed to fetch meal data. Please try again later!</p>
    </main>; 
}