import { Suspense } from 'react';
import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

// Suspense 컴포넌트를 사용하기 위해서 따로 분리
async function Meal() {
  const meals = await getMeals();

  // throw new Error('Loading meals failed! ');
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        {/** Suspense를 사용하면 전체 페이지가 reload 되지 않고 부분만 reload된다 */}
        <Suspense fallback={<p className={classes.loading}>Fectching meals...</p> }>
            <Meal />
        </Suspense>
      </main>
    </>
  );
}