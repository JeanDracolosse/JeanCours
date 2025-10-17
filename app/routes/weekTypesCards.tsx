import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import { useLoaderData } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import HrTimeInZoneChart from "~/components/hrTImeInZoneChart";
import type { HrTimeInZoneType } from "~/interfaces";
import { getHrTimeInZone, getIndex } from "~/utils/mongo";

export async function loader() {
  const hrTimeInZone = await getHrTimeInZone();
  const index = await getIndex()

  return { hrTimeInZone, index };
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function Image({ id, hrTimeInZone, index }: { id: number, hrTimeInZone: HrTimeInZoneType, index: string[] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="img-container">
      <div ref={ref}>
        <HrTimeInZoneChart index={index} hrTimeInZone={hrTimeInZone} />
      </div>
      <motion.h2
        // Hide until scroll progress is measured
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >{`#00${id}`}</motion.h2>
    </section>
  )
}

export default function Parallax() {

  const { hrTimeInZone, index } = useLoaderData() as {
    hrTimeInZone: HrTimeInZoneType;
    index: string[];
  }

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <ClientOnly fallback={<p>Chargement ...</p>}>
      {() => (
        <div id="example">
          {[1, 2, 3, 4, 5].map((image) => (
            <Image key={image} id={image} hrTimeInZone={hrTimeInZone} index={index} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
          <StyleSheet />
        </div>
      )}</ClientOnly>
  )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
        html {
            scroll-snap-type: y mandatory;
        }

        .img-container {
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .img-container > div { /* Size container*/
            /*width: 300px;
            height: 400px;*/
            margin: 20px;
            background: #f5f5f5;
            overflow: hidden;
        }

        .img-container img {
            width: 300px;
            height: 400px;
        }

        @media (max-width: 500px) {
            .img-container > div {
                width: 150px;
                height: 200px;
            }

            .img-container img {
                width: 150px;
                height: 200px;
            }
        }

        .img-container h2 {
            color: #8df0cc;
            margin: 0;
            font-family: "Azeret Mono", monospace;
            font-size: 50px;
            font-weight: 700;
            letter-spacing: -3px;
            line-height: 1.2;
            position: absolute;
            display: inline-block;
            top: calc(50% - 350px);
            left: calc(50% - 350px);
        }

        .progress {
            position: fixed;
            left: 0;
            right: 0;
            height: 5px;
            background: #8df0cc;
            bottom: 50px;
            transform: scaleX(0);
        }
    `}</style>
  )
}
