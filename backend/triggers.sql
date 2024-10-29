DELIMITER //

CREATE TRIGGER after_role_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
   IF OLD.role <> NEW.role THEN
        
        INSERT INTO notifications (user_id, message, date, is_read, route)
        VALUES (NEW.user_id, 
                CONCAT('Your role has been changed from ', OLD.role, ' to ', NEW.role), 
                NOW(), 
                0, 
                '/profile'); 
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER after_booking_status_update
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status THEN
        
        INSERT INTO notifications (user_id, message, date, is_read, route)
        VALUES (NEW.user_id, 
                CONCAT('Your booking for "', NEW.event_name, '" at Venue ', NEW.venue_id, ' has been ', NEW.status), 
                NOW(), 
                0, 
                '/bookings/'); 
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER after_maintenance_issue_insert
AFTER INSERT ON maintenance
FOR EACH ROW
BEGIN
   INSERT INTO notifications (user_id, message, date, is_read, route)
    SELECT user_id, 
           CONCAT('New maintenance issue reported for Venue ID: ', NEW.venue_id, ' - ', NEW.issue_description), 
           NOW(), 
           0, 
           '/maintenance/'
    FROM users
    WHERE role = 'maintenance';
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER after_maintenance_status_update
AFTER UPDATE ON maintenance
FOR EACH ROW
BEGIN
    -- Check if the status field was updated
    IF OLD.status != NEW.status THEN

        -- Notify the user who reported the issue
        INSERT INTO notifications (user_id, message, date, is_read, route)
        VALUES (
            NEW.reported_by, 
            CONCAT('The status of your maintenance issue at venue ', NEW.venue_id, ' has been updated to ', NEW.status), 
            NOW(), 
            0, 
            '/maintenance/' -- Example route, adjust as needed
        );

        -- Toggle the under_maintenance flag in the rooms table based on status
        IF NEW.status = 'In Progress' THEN
            -- Set the corresponding room's under_maintenance field to true (1)
            UPDATE rooms 
            SET under_maintenance = 1
            WHERE room_id = NEW.venue_id;
        ELSEIF NEW.status = 'Resolved' THEN
            -- Set the corresponding room's under_maintenance field to false (0)
            UPDATE rooms 
            SET under_maintenance = 0
            WHERE room_id = NEW.venue_id;
        END IF;

    END IF;
END //

DELIMITER ;
