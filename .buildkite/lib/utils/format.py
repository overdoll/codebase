def format_env_vars(variables):
    if variables:
        return ["{}={}".format(k, v) for k, v in variables.items()]
    return []
