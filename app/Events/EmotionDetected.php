<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EmotionDetected
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $emotion;

    /**
     * Create a new event instance.
     */
    public function __construct($emotion)
    {
        $this->emotion = $emotion;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('emotion-channel'),
        ];
    }

    public function broadcastAs()
    {
        return 'emotion.detected';
    }
}
