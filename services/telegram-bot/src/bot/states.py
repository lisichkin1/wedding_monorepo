from aiogram.fsm.state import State, StatesGroup

class GuestStates(StatesGroup):
    waiting_for_token = State()
    waiting_for_name = State()   
    waiting_for_type = State() 