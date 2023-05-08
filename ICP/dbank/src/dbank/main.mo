import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Dbank {
  stable var currentValue: Float = 300;
  let x = 787988222855222;
  var startTime = Time.now();

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (x));
  };

  public func withdraw(amount : Float) {
    let tempAmount : Float = currentValue - amount;
    if (tempAmount >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Amount is more than balance")
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapasedNS = currentTime - startTime;
    let timeElapasedS = timeElapasedNS / 1000000000;
    currentValue := currentValue + (1.01 ** Float.fromInt(timeElapasedS));
    startTime := currentTime;
  };
};
