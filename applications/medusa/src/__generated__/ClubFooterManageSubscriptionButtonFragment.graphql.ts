/**
 * @generated SignedSource<<1f70e1770bff3d66aa02cf968f7c788b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterManageSubscriptionButtonFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly clubSupporterSubscription: {
      readonly reference?: string;
    } | null;
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentType": "ClubFooterManageSubscriptionButtonFragment";
};
export type ClubFooterManageSubscriptionButtonFragment$key = {
  readonly " $data"?: ClubFooterManageSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterManageSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterManageSubscriptionButtonFragment",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "clubSupporterSubscription",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reference",
                  "storageKey": null
                }
              ],
              "type": "IAccountClubSupporterSubscription",
              "abstractKey": "__isIAccountClubSupporterSubscription"
            }
          ],
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "426218f6828890f7e60190b43c18c1c5";

export default node;
