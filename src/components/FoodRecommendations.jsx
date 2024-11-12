'use client'

import { useState, useEffect } from 'react'
import { Card, ListGroup, Alert } from 'react-bootstrap'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default function FoodRecommendations({ user }) {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const db = getFirestore()

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const docRef = doc(db, 'userProfiles', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const userData = docSnap.data()
          // This is where you would typically call your backend API to get recommendations
          // For this example, we'll just use some mock data based on user profile
          const mockRecommendations = generateMockRecommendations(userData)
          setRecommendations(mockRecommendations)
        } else {
          setError('User profile not found. Please complete your profile.')
        }
      } catch (err) {
        setError('Error fetching recommendations. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [user, db])

  const generateMockRecommendations = (userData) => {
    // This is a placeholder function. In a real application, this logic would be on the server.
    const recommendations = []
    if (userData.chronicConditions.toLowerCase().includes('diabetes')) {
      recommendations.push('Low-carb meals', 'High-fiber foods', 'Lean proteins')
    }
    if (parseInt(userData.age) > 50) {
      recommendations.push('Calcium-rich foods', 'Vitamin D supplements')
    }
    if (parseInt(userData.weight) > 80) {
      recommendations.push('Portion-controlled meals', 'Increased vegetable intake')
    }
    return recommendations
  }

  if (!user) {
    return <Alert variant="warning">Please log in to view your food recommendations.</Alert>
  }

  if (loading) {
    return <Alert variant="info">Loading recommendations...</Alert>
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div>
      <h2>Your Food Recommendations</h2>
      <Card>
        <ListGroup variant="flush">
          {recommendations.map((recommendation, index) => (
            <ListGroup.Item key={index}>{recommendation}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  )
}