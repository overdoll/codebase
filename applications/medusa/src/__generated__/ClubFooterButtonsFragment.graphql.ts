/**
 * @generated SignedSource<<0484cedefe2f74be39de32e4d9980fd2>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterCopyLinkButtonFragment" | "ClubFooterLeaveButtonFragment" | "ClubFooterManageSubscriptionButtonFragment" | "ClubFooterShareDiscordButtonFragment" | "ClubFooterShareRedditButtonFragment" | "ClubFooterShareTwitterButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareTwitterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareDiscordButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7f6def4b19c8df1c4d9bd7b28e7eb2d3";

export default node;
