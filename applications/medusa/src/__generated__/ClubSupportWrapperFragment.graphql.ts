/**
 * @generated SignedSource<<300ff03bf70e2a5270e48b4ffde1f8eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportWrapperFragment$data = {
  readonly canSupport: boolean;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubPriceButtonFragment" | "SupportClubTransactionProcessFragment">;
  readonly " $fragmentType": "ClubSupportWrapperFragment";
};
export type ClubSupportWrapperFragment$key = {
  readonly " $data"?: ClubSupportWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporter",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSupport",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubPriceButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "e61584e6934be68b3bb556f61bdf66e1";

export default node;
