/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UsernameAliasCard = {
    readonly id: string;
    readonly username: string;
    readonly " $refType": "UsernameAliasCard";
};
export type UsernameAliasCard$data = UsernameAliasCard;
export type UsernameAliasCard$key = {
    readonly " $data"?: UsernameAliasCard$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UsernameAliasCard">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UsernameAliasCard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "AccountUsername",
  "abstractKey": null
};
(node as any).hash = 'bd691ead6b274a5113ea3a3ef388045c';
export default node;
