delete from words 
where id not in (
    select max(id) 
    from words 
    group by muchik
);