/**
 * @generated SignedSource<<31ea9945b8734755358787a31f5cf462>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterCopyLinkButtonFragment" | "ClubFooterLeaveButtonFragment" | "ClubFooterManageSubscriptionButtonFragment">;
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
      "name": "ClubFooterCopyLinkButtonFragment"
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

(node as any).hash = "52662c14f52de21bb6032ea7cee4bcee";

export default node;
