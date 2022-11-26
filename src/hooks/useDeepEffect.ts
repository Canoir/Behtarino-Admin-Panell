import { useEffect, useRef, useMemo, DependencyList } from 'react';
import deepEqual from 'fast-deep-equal/react';

export default function useDeepEffect(callback: () => void, dependencies: DependencyList) {
  const ref = useRef(dependencies);
  const signalRef = useRef(0);

  if (!deepEqual(dependencies, ref.current)) {
    ref.current = dependencies;
    signalRef.current += 1;
  }

  const deps = useMemo(() => ref.current, [signalRef.current]);

  return useEffect(callback, deps);
}
