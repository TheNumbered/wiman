import React from 'react';

interface TimeAgoProps {
  timestamp: string;
}

const timeAgo = (timestamp: string): string => {
  const currentTime = new Date();
  const pastTime = new Date(timestamp);
  const diff = currentTime.getTime() - pastTime.getTime(); // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year(s) ago`;
  if (months > 0) return `${months} month(s) ago`;
  if (weeks > 0) return `${weeks} week(s) ago`;
  if (days > 0) return `${days} day(s) ago`;
  if (hours > 0) return `${hours} hour(s) ago`;
  if (minutes > 0) return `${minutes} minute(s) ago`;
  return `${seconds} second(s) ago`;
};

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  return <p style={{ margin: 0 }}>{timeAgo(timestamp)}</p>;
};

export default TimeAgo;
