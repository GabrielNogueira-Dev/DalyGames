"use client"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function Send(userId: string): Promise<void> {
  if (!userId) return

  // Referência para o documento do usuário
  const docRef = doc(db, "favorites", userId)
  const snapshot = await getDoc(docRef)

  // Verifica se o documento existe
  if (!snapshot.exists()) {
    alert("Nenhum jogo encontrado para compartilhar!")
    return
  }

  // Pega o array de jogos salvo
  const games: string[] = snapshot.data()?.games || []

  if (games.length === 0) {
    alert("Nenhum jogo encontrado para compartilhar!")
    return
  }

  // Transforma array em string para compartilhar
  const gamesText = games.join(", ")

  // Usa a API de compartilhamento do navegador
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Meus jogos favoritos na Daly Games",
        text: `Olha os jogos que eu adicionei: ${gamesText}`,
        url: window.location.href, // URL do perfil
      })
    } catch (error) {
      alert("Erro ao compartilhar: " + error)
    }
  } else {
    alert("Navegador não suporta a API de compartilhamento")
  }
}
