import React from 'react'
import { Space, Title } from '@mantine/core'
import WeekTypeCard from '../components/cards/WeekTypeCard'

export default function WeekTypes() {
    return (
        <div>
            <Title order={4}>Types de semaine</Title>
            <Space h="md" />
            <WeekTypeCard
                title="Base"
                content={[
                    'Que du Z1, essayer de limiter Z2 à 15%',
                    '2 séances de sprints en côte/foulées bondissantes',
                    '1 séance Z3 de 5 à 10%, puis Z4 à partir de 5% quand possible (petite, et si envie)',
                    'Weekend: sortie longue de 30 à 40% du volume',
                ]}
            />
            <WeekTypeCard
                title="Intensive"
                content={[
                    'Séances Z3 de 5 à 10%, puis Z4 à partir de 5% quand possible',
                    '2 séances de sprints en côte/foulées bondissantes',
                    'Weekend: sortie longue de 30 à 40% du volume',
                ]}
            />
            <WeekTypeCard
                title="Récupération"
                content={[
                    '50% du volume de la semaine précédente',
                    'Essayer de limiter Z2 à 15%',
                    '1 séance de sprints en côte/foulées bondissantes, moitié plus petite',
                    'Que du Z1, essayer de limiter Z2 à 15%',
                    '1 sortie mi-longue de 20% du volume',
                    'Weekend: sortie longue de 30 à 40% du volume',
                ]}
            />
            <WeekTypeCard
                title="Spécifique"
                content={[
                    'Essayer de limiter Z2 à 15%',
                    '1 séance de sprints en côte/foulées bondissantes',
                    'Séances Z4 de 5 à 10%',
                    'Weekend: 2 sorties longues pour arriver entre 60 à 80% du volume',
                ]}
            />
        </div>
    )
}
