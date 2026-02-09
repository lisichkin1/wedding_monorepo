from aiogram.fsm.state import State, StatesGroup

class GuestStates(StatesGroup):

    waiting_for_name = State()  