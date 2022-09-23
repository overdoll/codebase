/**
 * @generated SignedSource<<e88f561f5210450a904fe78ab3f459b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterButtonsFragment$data = {
  readonly slug: string;
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterLeaveButtonFragment" | "ClubFooterManageSubscriptionButtonFragment">;
  readonly " $fragmentType": "ClubFooterButtonsFragment";
};
export type ClubFooterButtonsFragment$key = {
  readonly " $data"?: ClubFooterButtonsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterButtonsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterButtonsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterLeaveButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterManageSubscriptionButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5a5c499c1cba2c9bb8328ba35895da45";

export default node;
