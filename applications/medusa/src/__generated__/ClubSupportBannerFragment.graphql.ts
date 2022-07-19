/**
 * @generated SignedSource<<0b331e29eaf4d1305f9a11022062fa5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportBannerFragment$data = {
  readonly canSupport: boolean;
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportConditionWrapperFragment" | "ClubSupporterSubscriptionPriceButtonFragment">;
  readonly " $fragmentType": "ClubSupportBannerFragment";
};
export type ClubSupportBannerFragment$key = {
  readonly " $data"?: ClubSupportBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportBannerFragment",
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
      "name": "viewerIsOwner",
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
      "name": "ClubSupportConditionWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupporterSubscriptionPriceButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "938e204944116c759f4dda6a84000f7a";

export default node;
