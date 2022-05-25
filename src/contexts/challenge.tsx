import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useContext,
} from "react";
import { tags } from "../utils/tags";

interface ChallengeContextData {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  time: number;
  countdown: number;
  totalTime: number;
  guesstedTags: string[];
  startCountdown: boolean;
  finishChallenge: boolean;
  startChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

interface ChallengeProviderProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  let timer = useRef(1 * 60);

  const time = timer.current;

  const [countdown, setCountdown] = useState(timer.current);
  const [totalTime, setTotalTime] = useState(0);
  const [value, setValue] = useState("");
  const [guesstedTags, setGuesstedTags] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);
  const [finishChallenge, setFinishChallenge] = useState(false);

  const increaseCountdownTimer = () => (timer.current = timer.current + 5);
  const cleanInput = () => setValue("");

  function existsInTags(value) {
    return tags.includes(value.toLowerCase());
  }

  function existsInGuesstedTags(value) {
    return guesstedTags.includes(value.toLowerCase());
  }

  function addedGuesstedTags(value) {
    if (existsInTags(value) && !existsInGuesstedTags(value) && countdown > 0) {
      setGuesstedTags([...guesstedTags, value.toLowerCase()]);
      increaseCountdownTimer();
      cleanInput();
    }
  }

  function startChallenge() {
    setStartCountdown(true);
    addedGuesstedTags(value);
  }

  function guessedAllTags() {
    if (tags.length - guesstedTags.length === 0) {
      setStartCountdown(false);
      setFinishChallenge(true);
    }
  }

  useEffect(() => {
    if (startCountdown === true && countdown > 0) {
      setTimeout(() => {
        setCountdown((timer.current = timer.current - 1));
        setTotalTime(totalTime + 1);
      }, 1000);
    } else if (tags.length === guesstedTags.length || countdown === 0) {
      setStartCountdown(false);
      setFinishChallenge(true);
    }

    guessedAllTags();
  }, [countdown, startCountdown]);

  return (
    <ChallengeContext.Provider
      value={{
        time,
        value,
        setValue,
        totalTime,
        countdown,
        guesstedTags,
        startCountdown,
        startChallenge,
        finishChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export const useChallenge = () => useContext(ChallengeContext);
