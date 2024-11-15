package com.concurrente.jurassicpark.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "log_entries")
@Getter
@Setter
public class LogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private String island;

    @Enumerated(EnumType.STRING)
    private LogLevel level;

    private LocalDateTime timestamp;

    public LogEntry() {
    }

    public LogEntry(String message, LogLevel level, String idIsland) {
        this.message = message;
        this.level = level;
        this.timestamp = LocalDateTime.now();
        this.island = idIsland;
    }
}
