import { IReview, ReviewApi } from "@/api/review.api";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import styles from "./styles.module.css";

export const ReviewList = async () => {
  const reviewApi = ReviewApi.getInstance();
  const data = await reviewApi.getReviews();
  return (
    <div className={styles.wrapper}>
      {data?.map((item: IReview) => (
        <ReviewCard key={item.id} {...item} />
      ))}
    </div>
  );
};
