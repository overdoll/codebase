/**
 * @generated SignedSource<<0b6d756f0d688b193fa6eeab9677ecd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubStatusFragment$data = {
  readonly suspension: {
    readonly expires: any;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendClubFormFragment" | "StaffClubUnSuspendButtonFragment">;
  readonly " $fragmentType": "StaffClubStatusFragment";
};
export type StaffClubStatusFragment = StaffClubStatusFragment$data;
export type StaffClubStatusFragment$key = {
  readonly " $data"?: StaffClubStatusFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubStatusFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubStatusFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendClubFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubUnSuspendButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6b5d23916dbb71806ed50fd67264985c";

export default node;
