/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SessionCardFragment = {
    readonly device: string;
    readonly ip: string;
    readonly created: unknown;
    readonly current: boolean;
    readonly " $refType": "SessionCardFragment";
};
export type SessionCardFragment$data = SessionCardFragment;
export type SessionCardFragment$key = {
    readonly " $data"?: SessionCardFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SessionCardFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SessionCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "device",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ip",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "current",
      "storageKey": null
    }
  ],
  "type": "AccountSession",
  "abstractKey": null
};
(node as any).hash = 'd5268de138e39bb8fa9e752d3a78fcb0';
export default node;
