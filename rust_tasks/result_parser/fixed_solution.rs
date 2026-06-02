pub fn parse_positive(input: &str) -> Result<u32, String> {
    let parsed: i64 = input
        .trim()
        .parse()
        .map_err(|_| "value must be an integer".to_string())?;

    if parsed <= 0 {
        return Err("value must be positive".to_string());
    }
    if parsed > u32::MAX as i64 {
        return Err("value is too large".to_string());
    }

    Ok(parsed as u32)
}

#[cfg(test)]
mod tests {
    use super::parse_positive;

    #[test]
    fn parses_positive_number() {
        assert_eq!(parse_positive("42"), Ok(42));
    }

    #[test]
    fn rejects_invalid_values() {
        assert!(parse_positive("abc").is_err());
        assert!(parse_positive("0").is_err());
        assert!(parse_positive("-1").is_err());
    }
}
