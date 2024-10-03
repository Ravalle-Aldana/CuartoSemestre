import pygame

pygame.init()

# Configuracion de pantalla
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
running = True
dt = 0

# Configuracion de colores
GREEN = (93, 156, 89)
RED = (223, 46, 56)

# posición del jugador
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

# Velocidad del jugador
player_speed = 5

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Detectar las teclas
    keys = pygame.key.get_pressed()

    # Movimiento del jugador
    if keys[pygame.K_LEFT]:
        player_pos.x -= player_speed

    if keys[pygame.K_RIGHT]:
        player_pos.x += player_speed
    
    if keys[pygame.K_DOWN]:
        player_pos.y += player_speed
    
    if keys[pygame.K_UP]:
        player_pos.y -= player_speed

    # Limpiar pantalla
    screen.fill(GREEN)

    # Jugador
    pygame.draw.circle(screen, (RED), (int(player_pos.x), int(player_pos.y)), 10)

    # Actualizar pantañña
    pygame.display.flip()

    # Control de velocidad del jugador
    clock.tick(60)

pygame.quit()
